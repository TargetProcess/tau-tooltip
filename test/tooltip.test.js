import {assert, expect} from 'chai';
import {Tooltip} from './../src/tooltip';

const $ = function (selector) {
    let elements = [];
    if(typeof selector !== 'string') {
        elements = [selector];
    } else if (selector.startsWith('.')) {
        elements = elements.concat(document.querySelectorAll(selector)[0]);
    } else {
        const div = document.createElement('div');
        div.innerHTML = selector;
        elements = elements.concat(div.firstChild);
    }

    return {
        hasClass(className) {
            return Boolean(elements[0] && elements[0].classList.contains(className));
        },
        '0': elements[0],
        appendTo(selector) {
            document.querySelector(selector).appendChild(elements[0]);
            return this;
        },
        remove() {
            elements[0].parentNode.removeChild(elements[0]);
            return this;
        },
        css(styles) {
           Object.keys(styles).forEach((key) => {
               elements[0].style[key] = styles[key];
           });
           return this;
        },
        text() {
            return elements[0].textContent;
        }
    }
};

describe('balloon api', function () {
    var classTooltip = 'tooltip';
    var selector = '.' + classTooltip;
    var balloon;
    beforeEach(function () {
        balloon = new Tooltip('hello world!!!', {baseClass: classTooltip, effectClass: 'fade', spacing: 3});
    });
    afterEach(function () {
        balloon.destroy();
    });
    it('show', function () {
        balloon.show();
        expect($(selector).hasClass('in')).to.be.true;
    });
    it('hide', function () {
        balloon.hide();
        expect($(selector).hasClass('in')).to.be.false;
    });
    it('getElement', function () {
        balloon.show();
        expect($(selector)[0]).to.be.equal(balloon.getElement());
    });

    it('toggle', function (done) {
        balloon.show();
        balloon.toggle();
        expect($(selector).hasClass('in')).to.be.false;
        setTimeout(function () {
            balloon.toggle();
            expect($(selector).hasClass('in')).to.be.true;
            done();
        }, 300);
    });
    it('baseClass and type', function () {
        var balloon = new Tooltip('hello world!!!', {baseClass: 'myClass', typeClass: 'typeClass'});
        expect($(balloon.getElement()).hasClass('myClass')).to.be.true;
        expect($(balloon.getElement()).hasClass('typeClass')).to.be.true;
        balloon.type('newType');
        balloon.effect('effect');
        expect($(balloon.getElement()).hasClass('typeClass')).to.be.false;
        expect($(balloon.getElement()).hasClass('effect')).to.be.true;
        expect($(balloon.getElement()).hasClass('newType')).to.be.true;
        balloon.effect('');
        expect($(balloon.getElement()).hasClass('effect')).to.be.false;

    });
    it('position', function () {
        balloon.position(63, 63);
        assert.ok(true, 'should position');
    });
    it('content', function () {
        balloon.show();
        balloon.content('<div class="myClass">test content</div>');
        assert.equal($(selector + ' .myClass').text(), 'test content', 'content string');
        var div = $('<div class="myClass1">test content</div>')[0];
        balloon.content(div);
        assert.equal($(selector + ' .myClass1').text(), 'test content', 'content dom element');
    });
    it('reposition and attach and destroy and detach', function (done) {
        Tooltip.reposition();
        assert.ok(true, 'should reposition');
        var $div = $('<div style="height: 100px;width: 100px"/>').appendTo('body');
        var awareBalloon = new Tooltip('hello world!!!', {auto: true});
        awareBalloon.attach($div[0]).show();
        Tooltip.reposition();

        assert.ok(true, 'should reposition');
        setTimeout(function () {
            awareBalloon.detach();
            awareBalloon.destroy();
            assert.equal(awareBalloon.element, null, 'should destroy');
            $div.remove();
            done();
        }, 20);
    });
    it('place', function () {
        balloon.show(10, 10);
        var places = ['bottom', 'top', 'left', 'right', 'right-top', 'right-left', 'right-bottom', 'top-left', 'top-right', 'bottom-right', 'bottom-left', 'left-top', 'left-bottom'];
        places.forEach(function (place) {
            balloon.place(place);
            assert.ok(true);
        });

    });

    /* balloon.type();
     balloon.effect();
     balloon.content();
     balloon.place();
     balloon.updateSize();
     balloon.attach();
     balloon.detach();
     balloon.position();
     balloon.getElement();
     balloon.show();
     balloon.hide();
     balloon.destroy();*/
});
describe('balloon without new operator', function () {
    var balloon;
    beforeEach(function () {
        balloon = Tooltip('hello world!', {spacing: 3, auto: true});
    });
    afterEach(function () {
        balloon.destroy();
    });
    it('balloon', function () {
        expect(balloon).to.be.instanceof(Tooltip);
    });
    it('auto position top', function (done) {
        var $div = $('<div  style="position:absolute;height: 100px;width: 100px"/>').appendTo('body');
        balloon.show().attach($div[0]);
        expect(balloon.element.classList.contains('bottom')).to.be.true;
        //   Tooltip.reposition();
        $div.css({top: '200px', left: '200px'});
        balloon.detach();
        balloon.show().attach($div[0]);
        setTimeout(function () {
            expect(balloon.element.classList.contains('top')).to.be.true;
            done();
        }, 40);

    });
    it('auto position left', function (done) {
        var $div = $('<div  style="position:absolute;height: 100px;width: 100px"/>').appendTo('body');
        balloon.place('left');
        balloon.show().attach($div[0]);
        expect(balloon.element.classList.contains('right')).to.be.true;
        $div.css({top: '200px', left: '200px'});
        balloon.detach();
        balloon.show().attach($div[0]);
        setTimeout(function () {
            expect(balloon.element.classList.contains('left')).to.be.true;
            done();
        }, 20);

    });
    it('auto position top-left', function (done) {
        var $div = $('<div  style="position:absolute;height: 100px;width: 100px"/>').appendTo('body');
        balloon.place('top-left');
        balloon.show().attach($div[0]);
        expect(balloon.element.classList.contains('bottom-left')).to.be.true;
        $div.css({top: '200px', left: '200px'});
        balloon.detach();
        balloon.show().attach($div[0]);
        setTimeout(function () {
            expect(balloon.element.classList.contains('top-left')).to.be.true;
            done();
        }, 20);

    });
    it('auto position top-right', function (done) {
        var $div = $('<div  style="position:absolute;height: 100px;width: 100px"/>').appendTo('body');
        balloon.place('top-right');
        balloon.show().attach($div[0]);
        expect(balloon.element.classList.contains('bottom-right')).to.be.true;
        $div.css({top: '200px', left: '200px'});
        balloon.detach();
        balloon.show().attach($div[0]);
        setTimeout(function () {
            expect(balloon.element.classList.contains('top-right')).to.be.true;
            done();
        }, 20);

    });

});
