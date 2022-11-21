import jui from '../../src/base/base.js'
import color from '../../src/util/color.js'

jui.use(color);

describe('/util/color.js', () => {
    const ColorUtil = jui.include('util.color');

    test('Check include module', () => {
        expect(ColorUtil).toBeDefined();
    });

    test('Check rgb method', () => {
        const rgb = ColorUtil.rgb('#FF0000');
        expect(rgb.r).toBe(255);
    });
})