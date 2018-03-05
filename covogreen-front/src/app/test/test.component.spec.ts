import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent } from './test.component';
import {} from 'jasmine';


describe('TestComponent', () => {

    let component: TestComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
        }).compileComponents();
    }));

    it('Hello World', () => {
        expect(component.helloWorld).toEqual("Hello World !");
    });

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain('test works!');
    }));
});
