import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getProfile, updateProfile } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useProfile() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const profileQuery = useQuery(['profile', uid || ''], () => getProfile(uid), {
    enabled: !!uid,
  });

  const editProfile = useMutation((profile) => updateProfile(uid, profile), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', uid]);
    },
  });

  return { profileQuery, editProfile };
}
