import { TestBed } from '@angular/core/testing';

import { HomeTabsService } from './hide-home-tabs.service';

describe('HideHomeTabsService', () => {
  let service: HomeTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
