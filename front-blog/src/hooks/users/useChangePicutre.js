import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api action
import { updatePictureApi } from '../../api/actions';

export function useChangePicture() {
  const queryClient = useQueryClient();

  const { mutate: changePicutre, isLoading: isChangingPicture } = useMutation({
    mutationFn: (picture) => updatePictureApi(picture),
    onSuccess: () => {
      queryClient.invalidateQueries(['loggedUser']);
      toast.success('Picture updated successfully');
    },
    onError: (err) => {
      console.log(err.response.data.message);
      toast.error('Picture not updated successfully');
    },
  });

  return { changePicutre, isChangingPicture };
}
