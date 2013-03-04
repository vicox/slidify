AJS.toInit(function() {
    function slidifyShow() {
        var slidify = {
            remove: function() {
                AJS.$('#slidify-dialog').remove();
            },

            create: function(width, height, totalSlides) {
                this.width = width;
                this.height = height;
                this.total = totalSlides;
                this.slides = 0;
                this.firstSlide = true;

                this.dialog = new AJS.Dialog({
                    width: this.width,
                    height: this.height,
                    id: 'slidify-dialog',
                    closeOnOutsideClick: true
                });
            },

            enableKeys: function() {
                dialog = this.dialog;
                AJS.$(document).keyup(function(e) {
                    if (e.keyCode == 37) {
                        dialog.prevPage();
                    }
                    else if (e.keyCode == 39) {
                        dialog.nextPage();
                    }
                });
            },

            addSlide: function(title, content) {
                if(!this.firstSlide) {
                    this.dialog.addPage('slide');
                }
                else {
                    this.firstSlide = false;
                }
                this.dialog.addHeader(title, 'slide-header');
                this.dialog.addPanel('', content, 'slide-panel');

                this.addIndicatorPanel(this.slides, this.total);
                this.slides += 1;
            },


            addIndicatorPanel: function(current, total) {
                this.dialog.addButtonPanel();
                for (var i = 0; i < total; i++) {
                    if(i == current) {
                        this.dialog.addLink('|', 'slide-page-link-' + i);
                    }
                    else {
                        this.dialog.addLink('.', function(dialog, page) {
                                dialog.gotoPage(AJS.$(this).attr('class').split('-').pop());
                            },
                            'slide-page-link-' + i);
                    }
                }
            },

            show: function() {
                this.dialog.gotoPage(0);
                this.dialog.show();
            },

            fullscreen: function() {
                AJS.$('.aui-blanket').css('opacity', 1);

                var factor = AJS.$(window).height() / this.height;
                var transform = 'scale(' + factor + ')';
                AJS.$('#slidify-dialog').css('-moz-transform', transform)
                    .css('-webkit-transform', transform);


                AJS.$('#slidify-dialog img').each(function() {
                    var xOffset = (((AJS.$(this).attr('width') * factor) - AJS.$(this).attr('width')) / 2);
                    var yOffset = (((AJS.$(this).attr('height') * factor) - AJS.$(this).attr('height')) / 2);
                    var transform = 'scale(' + (1 / factor) + ')  translate(-' + xOffset + 'px, -' + yOffset + 'px)';
                    AJS.$(this).css('-moz-transform', transform)
                        .css('-webkit-transform', transform);
                });
            }
        }

        slidify.remove();

        slidify.create(480, 360, AJS.$('.wiki-content h2').size() + 1);
        slidify.enableKeys();

        var pageTitle = AJS.$('.wiki-content h1').first().html();
        slidify.addSlide(pageTitle, '<h1 class="slide-intro">' + pageTitle + '</h1>');


        AJS.$('.wiki-content h2').each(function(index) {
            slidify.addSlide(AJS.$(this).html(), AJS.$(this).nextUntil('h2').clone());
        });

        slidify.show();
        slidify.fullscreen();
    };

    AJS.$('#slidify-link').attr('href', '#');
    AJS.$('#slidify-link').click(slidifyShow);
});