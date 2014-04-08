/// <reference path="../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../definitions/showv/showv.d.ts" />

module Prisc {
    export class View extends showv.View {
        constructor(options: showv.IViewCreateOptions = {}) {
            super(options);
        }
    }
    export class ModalView extends showv.View {
        private static instance: ModalView = null;
        public static cancel() {
            if (ModalView.instance == null) return;
            ModalView.instance.vanish();
        }
        private static FADE_DURATION: number = 80;
        private background = '<div id="js-modal-background" class="modal-background clickable">This is modal-background.</div>';
        constructor(public contents: Prisc.View,
                    options: showv.IViewCreateOptions = {
                        className: 'modal-comprehensive-wrapper'
                    }) {
            super(options);
        }
        public static showWithContents(contentsView: Prisc.View): ModalView {
            var modal = new ModalView(contentsView);
            modal.$el.append(
                modal.background,
                modal.contents.render().$el
            );
            modal.show();
            return modal;
        }
        private show() {
            ModalView.instance = this;
            this.$el.hide().prependTo('body');
            this.$el.fadeIn(ModalView.FADE_DURATION);
        }
        private vanish() {
            $('.modal-comprehensive-wrapper').fadeOut(ModalView.FADE_DURATION, ()=> {
                $('.modal-comprehensive-wrapper').remove();
            });
            // delete this
            delete this.background;
            delete this.contents;
            delete this.$el;
        }
        events(): Object {
            return {
                'click #js-modal-background': 'vanishModal'
            }
        }
        vanishModal(ev: JQueryEventObject) {
            ev.stopPropagation();
            ev.preventDefault();
            this.vanish();
        }
    }
}
