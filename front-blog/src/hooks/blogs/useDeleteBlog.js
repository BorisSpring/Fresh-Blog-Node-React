import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// custom hook
import { useInvalidateOnDelete } from '../universal/useInvalidateOnDelete';

// api action
import { deleteBlogApi } from '../../api/actions';

export function useDeleteBlog(blogs) {
  const invalidateQuery = useInvalidateOnDelete();

  const { mutate: deleteBlog, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBlogApi(id),
    onSuccess: () => {
      toast.success('Blog has been deleted successfully');
      invalidateQuery('blogs', blogs.data);
    },
    onError: (err) => {
      console.log(err.response.data.message);
      toast.error(err?.response?.data?.message);
    },
  });

  return { deleteBlog, isDeleting };
}
