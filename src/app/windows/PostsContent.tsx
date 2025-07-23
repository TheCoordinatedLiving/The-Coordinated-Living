import React, { useState } from 'react';
import { DndContext, useDraggable, DragEndEvent } from '@dnd-kit/core';

interface Post {
  id: number;
  header: string;
  description: string;
  x: number;
  y: number;
}

const DraggablePostCard = ({ post }: { post: Post }) => {
  const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
    id: `draggable-${post.id}`,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 10 : 'auto',
  } : {};

  return (
    <div 
      ref={setNodeRef} 
      style={{...style, position: 'absolute', top: post.y, left: post.x}}
      className={`bg-white border border-gray-200 rounded-lg p-4 h-40 w-64 flex flex-col justify-between ${isDragging ? 'cursor-grabbing shadow-2xl' : 'cursor-grab'}`}
      {...listeners} {...attributes}
    >
      <div>
        <h3 className="font-semibold text-lg mb-1 text-black">{post.header}</h3>
        <p className="text-sm text-gray-600">{post.description}</p>
      </div>
    </div>
  );
};

const PostsContent = () => {
  const initialPosts: Post[] = [
    { id: 1, header: 'Finding Your Path', description: 'Counseling can be a guided journey...', x: 0, y: 0 },
    { id: 2, header: 'A Safe Space', description: 'In His grace, we create a safe space...', x: 280, y: 0 },
    { id: 3, header: 'Healing Words', description: 'Let the word of God and supportive counsel...', x: 0, y: 200 },
    { id: 4, header: 'Renewed Hope', description: 'Through every challenge, there is an opportunity...', x: 280, y: 200 },
  ];
  
  const [posts, setPosts] = useState(initialPosts);

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, delta} = event;
    const id = parseInt(String(active.id).split('-')[1]);
    
    setPosts(posts => posts.map(post => {
      if (post.id === id) {
        return { ...post, x: post.x + delta.x, y: post.y + delta.y };
      }
      return post;
    }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-8 w-full h-full overflow-hidden bg-gray-50">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Posts</h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Navigate the changing scenes of life with faith through our brief, insightful
              reflections and biblical insights. We aim to help you recognize God&apos;s abundant grace
              in your everyday moments, offering encouragement and a new perspective through
              His Word.
            </p>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search For Post" 
              className="border border-gray-300 rounded-md py-2 pl-4 pr-10 w-72 text-sm placeholder-black focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Draggable Cards Area */}
        <div className="relative h-[500px] w-full">
          {posts.map((post) => (
            <DraggablePostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default PostsContent; 