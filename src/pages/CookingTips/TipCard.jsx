import React from 'react';

const TipCard = ({ image, title, description, time, date }) => {
  return (
    <div className="relative flex flex-col w-[344px] h-[464px] rounded-[30px] overflow-hidden shadow-sm">
      {/* Image Background */}
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Container */}
      <div className="relative mt-auto p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm leading-relaxed opacity-90 mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex justify-between items-center border-t border-white/30 pt-4">
          <span className="text-xs uppercase tracking-wider">
            {time} - {date}
          </span>
          <button className="bg-white text-black text-xs font-bold py-2 px-6 rounded-full uppercase">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCard;