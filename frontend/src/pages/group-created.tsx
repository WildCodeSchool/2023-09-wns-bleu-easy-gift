import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function GroupCreated() {
  const router = useRouter();

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold mb-4'>Votre groupe a été créé !</h1>
      <div className='flex flex-col item-center'>
        <Button
          className='mb-4'
          onClick={() => router.push('/creating-groups')}
        >
          Сréer un nouveau groupe
        </Button>
        <Button className='mb-4' onClick={() => router.push('/gift-deteil')}>
          Voir les details de la groupe
        </Button>
        <Button className='mb-4' onClick={() => router.push('/gift-list')}>
          Voir le list des groupes
        </Button>
      </div>
      <p className='text-green-600 mt-4'>Succès</p>
      <p>Les invitations ont été envoyées à vos participants !</p>
    </div>
  );
}
