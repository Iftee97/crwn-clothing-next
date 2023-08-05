export default function UserItem({ user }) {
  return (
    <div className='border border-gray-300 p-4 rounded flex flex-col items-start w-full'>
      <h2 className='text-lg font-medium mb-6'>
        User ID: {user._id}
      </h2>
      <p className='text-base font-medium mb-3'>
        email: {user.email}
      </p>
      <p className='text-base font-medium'>
        username: {user.username}
      </p>
    </div>
  )
}
