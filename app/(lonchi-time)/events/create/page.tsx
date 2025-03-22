import CreateEventForm from '@/ui/events/create-form-event';
import MainWrapper from '@/ui/layout/main-wrapper';

export default function EventCreatePage() {
   return (
      <MainWrapper
         headSectionH1Props={{ content: 'Crear un evento' }}
         breadcrumbs={[
            { label: 'Eventos', href: '/' },
            { label: 'Crear evento', href: '#' },
         ]}>
         <CreateEventForm />
      </MainWrapper>
   );
}
