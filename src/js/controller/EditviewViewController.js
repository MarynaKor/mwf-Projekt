/**
 * @author Jörn Kreutel
 */
import {mwf} from "vfh-iam-mwf-base";
import {mwfUtils} from "vfh-iam-mwf-base";
import * as entities from "../model/MyEntities.js";

export default class EditviewViewController extends mwf.ViewController {

    // instance attributes set by mwf after instantiation
    args;
    root;
    // TODO-REPEATED: declare custom instance attributes for this controller

    /*
     * for any view: initialise the view
     */
    async oncreate() {
        // TODO: do databinding, set listeners, initialise the view
        console.log("oncreate(): this.args: ", this.args);
        this.mediaItem = this.args?.item || new entities.MediaItem();

        this.bindElement("myapp-mediaEditviewTemplate", {item: this.mediaItem}, this.root);

       this.editviewForm = this.root.querySelector("main form");

        this.editviewForm.onsubmit = () => {
            //handle the submit
            // const selectedSrc= this.editviewForm.src.value;
            // const selectedTitle= this.editviewForm.title.value;
            //
            // const newMediaItem = new entities.MediaItem(selectedTitle,selectedSrc);
            alert("newMediaItem: " + this.mediaItem.src + "; " + this.mediaItem.title);

            if (this.mediaItem.created){
                this.mediaItem.update().then(() => {
                    this.previousView({item: this.mediaItem}, "itemUpdated");
                })
            }else {
                this.mediaItem.create().then(() => {
                    this.previousView({item: this.mediaItem}, "itemCreated");
                });
            }

            //return false to prevent form data submission by the browser

            return false;
        }
        // call the superclass once creation is done
        super.oncreate();
    }

    // async onresume() {
    //     this.editviewForm.src.value = this.mediaItem.src;
    //     this.editviewForm.title.value = this.mediaItem.title;
    //
    //     super.onresume();
    // }

    constructor() {
        super();

        console.log("EditviewViewController()");
    }

    /*
     * for views that initiate transitions to other views
     * NOTE: return false if the view shall not be returned to, e.g. because we immediately want to display its previous view. Otherwise, do not return anything.
     */
    async onReturnFromNextView(nextviewid, returnValue, returnStatus) {
        // TODO: check from which view, and possibly with which status, we are returning, and handle returnValue accordingly
    }

    /*
     * for views with listviews: bind a list item to an item view
     * TODO: delete if no listview is used or if databinding uses ractive templates
     */
    bindListItemView(listviewid, itemview, itemobj) {
        // TODO: implement how attributes of itemobj shall be displayed in itemview
    }

    /*
     * for views with listviews: react to the selection of a listitem
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    onListItemSelected(itemobj, listviewid) {
        // TODO: implement how selection of itemobj shall be handled
    }

    /*
     * for views with listviews: react to the selection of a listitem menu option
     * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
     */
    onListItemMenuItemSelected(menuitemview, itemobj, listview) {
        // TODO: implement how selection of the option menuitemview for itemobj shall be handled
    }

    /*
     * for views with dialogs
     * TODO: delete if no dialogs are used or if generic controller for dialogs is employed
     */
    bindDialog(dialogid, dialogview, dialogdataobj) {
        // call the supertype function
        super.bindDialog(dialogid, dialogview, dialogdataobj);

        // TODO: implement action bindings for dialog, accessing dialog.root
    }

}
