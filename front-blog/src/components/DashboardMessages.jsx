import React from 'react';

//components
import Loader from './Loader';
import Message from './Message';
import Pagination from './Pagination';

// hooks
import { useFindAllMessages } from '../hooks/messages/useFindAllMessages';
import { useDeleteMessage } from '../hooks/messages/useDeleteMessage';
import { useUpdateMessageStatus } from '../hooks/messages/useUpdateMessageStatus';
import { findMessagesApi } from '../api/actions';
import { usePrefetchData } from '../hooks/universal/usePrefetchData';

const DashboardMessages = () => {
  const { messages, isLoadingMessages } = useFindAllMessages();
  const { deleteMessage, isDeleting } = useDeleteMessage(messages);
  const { updateMessageStatus, isUpdateing } = useUpdateMessageStatus();
  const prefetchQuery = usePrefetchData(
    messages?.totalPages,
    findMessagesApi,
    'messages'
  );

  prefetchQuery();

  if (isLoadingMessages) return <Loader />;

  return (
    <div className='flex flex-col gap-3  md:gap-5 overflow-y-auto h-calc-vh paddingDashboard'>
      {messages?.data?.map((message, i) => (
        <Message
          {...message}
          key={i}
          deleteMessage={deleteMessage}
          isActionPeforming={isDeleting || isUpdateing}
          updateMessageStatus={updateMessageStatus}
        />
      ))}
      <Pagination totalPages={messages?.totalPages} />
    </div>
  );
};

export default DashboardMessages;
