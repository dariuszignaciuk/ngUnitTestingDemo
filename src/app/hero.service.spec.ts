import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('HeroService', () => {
    let service: HeroService;
    let mockMessageSErvice;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        mockMessageSErvice = jasmine.createSpyObj(['add'])
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageSErvice }
            ]
        })
        service = TestBed.get(HeroService);
        httpTestingController = TestBed.get(HttpTestingController)
    });

    describe('getHerp', () => {
        it('should call get with the correct URL', () => {
            service.getHero(4).subscribe();

            const req = httpTestingController.expectOne('api/heroes/4');
            req.flush({ id: 4, name: 'SuperDude', strength: 100 })
            httpTestingController.verify() // verifies if there are no other requests besides the one tesing
        })
    })
})