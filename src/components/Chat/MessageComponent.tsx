import Image from 'next/image';

export interface MessageComponentProps {
  name: string; 
  backgroundColor: string; 
  darkbackgroundColor: string;
  content: string;
}

export const MessageComponent: React.FC<MessageComponentProps> = ({
  name,
  backgroundColor,
  darkbackgroundColor,
  content,
}) => {
  return (
    <div className="flex items-start gap-2.5 mt-2">
      <Image
        className="w-8 h-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt={`${name} image`}
        width={32}
        height={32}
      />
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${backgroundColor} rounded-e-xl rounded-es-xl dark:${darkbackgroundColor}`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            11:46
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {content}
        </p>
      </div>
    </div>
  );
};
