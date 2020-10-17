

const gridAttach = function (value, grid_pixel = 20) {
    var a = value % grid_pixel;
    return a > grid_pixel / 2 ? value + (grid_pixel - a) : value - a;
}

export default gridAttach 
