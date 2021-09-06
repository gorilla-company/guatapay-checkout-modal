import { createStep1 } from '../steps/step1';
import { createStep2 } from '../steps/step2';
import { createStep3 } from '../steps/step3';
import { createStep4 } from '../steps/step4';
import { createStepPaymentError } from '../steps/paymentError';
import { createStepExpired } from '../steps/expired';
import { createHeader } from '../steps/header';
import { createNavBar } from '../steps/navBar';

const htmlPattern = /<(\"[^\"]*\"|'[^']*'|[^'\">])*>/;

describe('Generate html steps', () => {
  test('it should create the step 1 html', () => {
    const step = createStep1();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the step 2 html', () => {
    const step = createStep2();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the step 3 html', () => {
    const step = createStep3();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the step 4 html', () => {
    const step = createStep4();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the payment error step html', () => {
    const step = createStepPaymentError();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the expired error step html', () => {
    const step = createStepExpired();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the header html', () => {
    const step = createHeader();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test('it should create the navbar html', () => {
    const step = createNavBar();
    expect(step.outerHTML).toMatch(htmlPattern);
  });
});
