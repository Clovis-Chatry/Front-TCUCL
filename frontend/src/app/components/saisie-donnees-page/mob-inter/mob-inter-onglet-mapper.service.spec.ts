import { MobInterOngletMapperService } from './mob-inter-onglet-mapper.service';
import { Voyage } from '../../../models/mob-international.model';

describe('MobInterOngletMapperService', () => {
  let service: MobInterOngletMapperService;

  beforeEach(() => {
    service = new MobInterOngletMapperService();
  });

  it('should convert null or undefined numeric fields to 0', () => {
    const voyage: Voyage = {
      id: 1,
      nomPays: 'France',
      prosAvion: null,
      prosTrain: undefined as any,
      stagesEtudiantsAvion: null,
      stagesEtudiantsTrain: undefined as any,
      semestresEtudiantsAvion: null,
      semestresEtudiantsTrain: undefined as any,
      dateAjoutEnBase: null,
    };

    const dto = service.toVoyageDto(voyage);
    expect(dto.prosAvion).toBe(0);
    expect(dto.prosTrain).toBe(0);
    expect(dto.stagesEtudiantsAvion).toBe(0);
    expect(dto.stagesEtudiantsTrain).toBe(0);
    expect(dto.semestresEtudiantsAvion).toBe(0);
    expect(dto.semestresEtudiantsTrain).toBe(0);
  });
});
