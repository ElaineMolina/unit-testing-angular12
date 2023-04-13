import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService} 
            ]
        })
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(HeroService);
    })

    describe('getHero', () => {
        it('should call get with the correct URL', () => {
            //call getHero()
            service.getHero(4).subscribe();

            //test tha the URL was correct
            const req = httpTestingController.expectOne('api/heroes/4')
            req.flush({id: 4, name: 'SuperDude', strenght: 100})
            httpTestingController.verify();
        })
    })

})