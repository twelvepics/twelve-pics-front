const isHorizontal = (pic) => {
    return pic.width >= pic.height;
}

const isVertical = (pic) => {
    return pic.width < pic.height;
}

module.exports = { isHorizontal, isVertical }



