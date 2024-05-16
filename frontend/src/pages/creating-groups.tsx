import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

const iconStar = {
  id: 'star',
  path: 'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z',
  viewBox: '0 0 16 16',
};
const iconTrash = {
  id: 'trash',
  path: 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5',
  viewBox: '0 0 16 16',
};
const ADD_NEW_GROUP = gql`
  mutation AddNewGroup($data: NewGroupInput!) {
    addNewGroup(data: $data) {
      id
      name
    }
  }
`;
interface NewGroupInput {
  name: string;
  emailUsers: string[];
}
interface AddNewGroupData {
  addNewGroup: {
    id: number;
    name: string;
  };
}
interface AddNewGroupVars {
  data: NewGroupInput;
}

export default function CreatingGroups() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [addNewGroup, { loading, error }] = useMutation<
    AddNewGroupData,
    AddNewGroupVars
  >(ADD_NEW_GROUP);
  const router = useRouter();

  const handleAddEmail = () => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addNewGroup({
        variables: {
          data: {
            name,
            emailUsers: emails,
          },
        },
      });
      router.push('/group-created');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-lg bg-white p-8 rounded shadow-md mb-5'
      >
        <h1 className='text-3xl font-bold mb-4'>Invitez vos amis</h1>
        <p className='mb-4'>
          Les échanges de cadeaux nécessitent au moins 3 participants
        </p>
        <div className='mb-4'>
          <label className='block mb-2 font-bold'>
            Ajouter des personnes (e-mail)
          </label>
          <Input
            type='email'
            placeholder='ajouter un email'
            value={email}
            onChange={handleEmailChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2 font-bold'>Nom de la groupe</label>
          <Input
            type='text'
            placeholder='name'
            value={name}
            onChange={handleNameChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='flex justify-end mb-4'>
          <Button type='button' onClick={handleAddEmail}>
            Ajouter
          </Button>
        </div>
        <div className='mb-4'>
          <p className='font-bold'>Les personnes déjà dans le groupe :</p>
          <div className='flex flex-wrap gap-4'>
            {emails.map((email, index) => (
              <div key={index} className='flex items-center group relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='w-5 h-5 text-primaryBlue mr-2'
                  viewBox={iconStar.viewBox}
                >
                  <path d={iconStar.path} />
                </svg>
                <label htmlFor={email} className='ml-2'>
                  {email}
                </label>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='w-5 h-5 ml-2 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-primaryRed'
                  viewBox={iconTrash.viewBox}
                  onClick={() => handleRemoveEmail(email)}
                >
                  <path d={iconTrash.path} />
                </svg>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-end mb-4'>
          <Button type='submit' disabled={loading}>
            Confirmez
          </Button>
        </div>
        {error && <p className='text-red-500 mt-2'>{error.message}</p>}
      </form>
    </div>
  );
}
