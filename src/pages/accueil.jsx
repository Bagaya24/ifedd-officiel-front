import { ImageHeaderAccueil } from '../components/acueil/ImageHeaderAccueil';
import { FeatureAccueil } from '../components/acueil/featureAccueil';
import { Apropos } from '../components/acueil/apropos';


import { Realisation } from '../components/acueil/realisation';
import { Partenaire } from '../components/acueil/partenaires';
import { Footer } from '../components/footer';
import { BookCard } from '../components/acueil/bookcard';
import { AxesInterventions } from '../components/acueil/axesIntervations';


export function Accueil() {
  
  return (
    <>
     <ImageHeaderAccueil/>
     <FeatureAccueil/>
     <Apropos/>
     <AxesInterventions/>
     <Realisation/>
     <BookCard />
     <Partenaire/>
     <Footer/>
      
    </>
  );
}