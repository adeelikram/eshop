import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NameModelPage } from './name-model.page';

describe('NameModelPage', () => {
  let component: NameModelPage;
  let fixture: ComponentFixture<NameModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NameModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
