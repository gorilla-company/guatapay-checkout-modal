import step1 from '../steps/step1';
import step2 from '../steps/step2';
import step3 from '../steps/step3';
import step4 from '../steps/step4';
import paymentError from '../steps/paymentError';
import expired from '../steps/expired';
import header from '../steps/header';
import navBar from '../steps/navBar';

const htmlPattern = /<(\"[^\"]*\"|'[^']*'|[^'\">])*>/;

describe('Generate html steps', () => {
  test('it should create the step 1 html', () => {
    const step = step1.createStep1();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the step 2 html', () => {
    const step = step2.createStep2();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the step 3 html', () => {
    const step = step3.createStep3();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the step 4 html', () => {
    const step = step4.createStep4();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the payment error step html', () => {
    const step = paymentError.createStepPaymentError();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the expired error step html', () => {
    const step = expired.createStepExpired();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the header html', () => {
    const step = header.createHeader();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the navbar html', () => {
    const step = navBar.createNavBar();
    expect(step.outerHTML).toMatch(htmlPattern);
  });
});
