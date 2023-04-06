export class GlobalClick {
    
    
    public clickedBody: boolean;
    public clickedMenu: boolean;


    constructor() {
        this.clickedBody = false;
        this.clickedMenu = false;
    }


}

export let globalClick: GlobalClick = new GlobalClick();

// export globalClick;