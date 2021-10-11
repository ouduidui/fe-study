// index.js
const App = getApp()

let rtp = 0.5
let maxHeight = 238.7
let maxWidth = 179
const coverImgProportion = 0.75 // 封面图宽高比例
const proportion = 0.477 // 瀑布流 封面图高与屏幕的比例
if (App.systemInfo && App.systemInfo.windowWidth) {
    rtp = App.systemInfo.windowWidth / 750
    maxWidth = App.systemInfo.windowWidth * proportion || maxWidth
    maxHeight = (App.systemInfo.windowWidth * proportion) / coverImgProportion || maxHeight
    maxHeight += 1
}

Component({
    // 组件的属性列表
    properties: {
        articles: {
            type: Array,
            value: [],
            observer(list) {
                this.handleArticleData(list)
            }
        }
    },
    // 组件的初始数据
    data: {
        records: [], // 总列表
        visibleIndexs: [], // 可渲染的索引列表
    },
    lifetimes: {
        detached() {
            this.disconnect()
        }
    },
    pageLifetimes: {
        show() {
            this.reconnect()
        }
    },
    ready() {
        this.createObserve()
    },
    // 组件的方法列表
    methods: {
        // 处理列表数据
        handleArticleData(list) {
            // 拆分成分屏数组 一屏 10 个
            const _list = [...list]
            const allList = []
            while (_list.length) {
                const currentList = _list.splice(0, 10)
                allList.push({
                    data: currentList
                })
            }
            this.handleWaterfullList(allList)
        },
        handleWaterfullList(list) {
            // 单位均为 rpx
            const titleHeight = 88 // 标题高度
            const avatarHeight = 34 // 头像高度
            const avatarMarginTop = 12 // 头像上边距
            const topicHeight = 48 // 话题高度
            const topicMarginTop = 12 // 话题上边距
            const contentPaddingTop = 12 // 内容上边距
            const contentPaddingBottom = 16 // 内容下边距
            const boxPaddingTop = 6 // 盒子上边距
            const boxPaddingBottom = 6 // 盒子下边距
            // 固定的高度集合
            const fixedHeight = [
                titleHeight, avatarHeight, avatarMarginTop, contentPaddingTop,
                contentPaddingBottom, boxPaddingTop, boxPaddingBottom
            ]

            list.forEach((item, index) => {
                const isLast = index + 1 === list.length
                // 这里的高度要先减去偏移量
                let leftHeight = 0 - item.leftOffset || 0
                let rightHeight = 0 - item.rightOffset || 0
                const leftData = []
                const rightData = []

                item.data.forEach(article => {
                    article.realHeight = this.calcImageHeight(article)
                    const heights = [...fixedHeight, article.realHeight]

                    if (article.topic) {
                        heights.push(topicHeight, topicMarginTop)
                    }

                    // 计算卡片高度
                    // 由于存在误差，所以将每个高度转换成 px 再相加
                    const cardHeight = heights.reduce((total, current) => total + this.handleRtoP(current), 0)
                    article.cardHeight = cardHeight

                    // 计算左右两列的高度
                    // 保证左右两列的高度差不会太大
                    if (leftHeight <= rightHeight) {
                        leftHeight += cardHeight
                        leftData.push(article)
                    } else {
                        rightHeight += cardHeight
                        rightData.push(article)
                    }
                })

                // 计算偏移量
                if (!isLast) {
                    const offset = Math.abs(leftHeight - rightHeight)
                    const nextIndex = index + 1
                    if (leftHeight >= rightHeight) {
                        list[nextIndex].rightOffset = offset
                        list[nextIndex].leftOffset = 0
                    } else {
                        list[nextIndex].leftOffset = offset
                        list[nextIndex].rightOffset = 0
                    }
                }
                item.height = Math.max(leftHeight, rightHeight)
                item.leftData = leftData
                item.rightData = rightData
            })

            this.setData({
                records: list
            }, () => {
                this.reconnect()
            })
        },
        calcImageHeight(article) {
            // 根据封面原始大小和比例换算成对应的尺寸
            // 超过限制则采用最大限制的高度
            let imageHeight = maxHeight

            if (article.imgHeight && article.imgWidth) {
                imageHeight = (maxWidth * article.imgHeight) / article.imgWidth
            }

            if (imageHeight > maxHeight) {
                imageHeight = maxHeight
            }

            // 先转换成 rpx
            imageHeight = imageHeight / rtp

            return imageHeight
        },
        handleRtoP(height) {
            return parseInt(height * rtp)
        },
        // 创建可视区域监听
        createObserve() {
            if (this.ob) return

            this.ob = this.createIntersectionObserver({
                observeAll: true,
                initialRatio: 0,
            }).relativeToViewport({
                bottom: 0
            })

            this.ob.observe('.waterfull__item', res => {
                const {index} = res.dataset
                if (res.intersectionRatio > 0) {
                    this.setData({
                        visibleIndexs: [index - 1, index, index + 1]
                    })
                }
            })
        },
        connect() {
            this.createObserve()
        },
        // 重连可视监听
        reconnect() {
            if (!this.ob) return
            this.disconnect()
            this.connect()
        },
        // 断开可视监听
        disconnect() {
            if (!this.ob) return
            this.ob.disconnect()
            this.ob = null
        },
    }
})
