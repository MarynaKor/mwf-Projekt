/**
 * @author Jörn Kreutel
 */
import {mwf} from "vfh-iam-mwf-base";
import {mwfUtils} from "vfh-iam-mwf-base";
import * as entities from "../model/MyEntities.js";

export default class MyInitialViewController extends mwf.ViewController {

    // instance attributes set by mwf after instantiation
    args;
    root;
    // TODO-REPEATED: declare custom instance attributes for this controller

    constructor() {
        super();

        var item = new entities.MyEntity();
        console.log("created: ", item);

        console.log("MyInitialViewController()");
    }

    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // TODO: do databinding, set listeners, initialise the view
        var helloEl = document.createElement("h1");
        helloEl.textContent = "Hello Mobile World...";
        this.root.appendChild(helloEl);

        // call the superclass once creation is done
        super.oncreate();
    }

}
