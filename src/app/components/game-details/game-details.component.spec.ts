import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelDetailsComponent } from './game-details.component';

describe('ChannelDetailsComponent', () => {
  let component: ChannelDetailsComponent;
  let fixture: ComponentFixture<ChannelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
