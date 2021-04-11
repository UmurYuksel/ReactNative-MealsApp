
//This is how I create class in c#, next time when I want to use this class to create instance from it, i will simply use this syntax as belox =>
// CategoryArray = [new Category(id,title, color)]
class Category {
    constructor(id, title, color) {
        this.id=id;
        this.title=title;
        this.color=color;
    }
}

export default Category;