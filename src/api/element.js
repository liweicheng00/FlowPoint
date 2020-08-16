
class Element {
    constructor(type, id, position = {}, props = { defult: 'defult' }) {
        this.type = type
        this.id = id;
        this.position = position;
        this.props = props;
        this.childs = [];
        this.parent = null;
    }
}


export default Element