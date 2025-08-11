import React from 'react';
import Image from 'next/image';

const clients = [
  { image: 'client-1.png', alt: 'axon' },
  { image: 'client-2.png', alt: 'jet start' },
  { image: 'client-3.png', alt: 'expedia' },
  { image: 'client-4.png', alt: 'qantas' },
  { image: 'client-5.png', alt: 'alitalia' },
];

const Clients = () => {
  return (
    <section className="mb-28" id="client">
      <div className="relative mx-auto max-w-full lg:max-w-7xl">
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-5 lg:gap-y-0 lg:gap-x-4">
          {clients.map((item, idx) => (
            <div
              key={idx}
              className="relative h-20 transform rounded-2xl p-4 grayscale transition-all duration-300 hover:-translate-y-1 hover:shadow-great hover:grayscale-0"
            >
              <Image
                src={`/images/${item.image}`}
                width={'100%'}
                height={'100%'}
                className="object-contain object-center"
                alt={item.alt}
                layout="fill"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
