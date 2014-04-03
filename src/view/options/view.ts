/// <reference path="../../../definitions/chrome/chrome.d.ts" />
/// <reference path="../../controller/controller.ts" />
/// <reference path="../view.ts" />
/// <reference path="../template.ts" />
/// <reference path="./header-view.ts" />
/// <reference path="./contents/view.ts" />
/// <reference path="./footer-view.ts" />

module Prisc {
    export class OptionsView extends View {
        private headerView: OptionHeaderView;
        private contentsView: OptionContentsView;
        private footerView: OptionFooterView;
        public title: string = "設定"
        constructor() {
            super({
                className: 'static-page-wrapper'
            });
            this.headerView = new OptionHeaderView();
            this.contentsView = new OptionContentsView();
            this.footerView = new OptionFooterView();
        }
        render(): OptionsView {
            this.$el.append(
                this.headerView.render().$el,
                this.contentsView.render().$el,
                '<button id="authorize">auth</button>',
                this.footerView.render().$el
            );
            return this;
        }
        events(): Object {
            return {
                'click #authorize': 'auth'
            }
        }
        auth() {
            Controller.sendMessage("TwitterAuthorize");
            window.close();
        }
    }
}