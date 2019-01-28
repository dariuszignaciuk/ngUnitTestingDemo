import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderfull Woman', strength: 16 },
            { id: 3, name: 'SuperDude', strength: 54 },
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {
        it('should remove the indicated hero from hero list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.delete(HEROES[0]);

            expect(component.heroes.length).toBe(2);
            expect(component.heroes[0].id).toBe(2);
            expect(component.heroes[1].id).toBe(3);
        });

        it('should call deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.delete(HEROES[0]);
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[0]);
        })
    });
})