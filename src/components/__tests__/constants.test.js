import { colors, footerHeight } from '../constants';

describe('component constants', () => {
  it('exports color palette and footer height', () => {
    expect(colors.darkestBlue).toBe('#0a2033');
    expect(colors.defaultButton.background).toBe('#ffffff');
    expect(colors.tertiaryButton.disabled).toBe('#eeba97');
    expect(footerHeight).toBe(50);
  });
});
