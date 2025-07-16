import React from 'react'

const Creaters = () => {
  return (
   <div className="flex flex-wrap gap-6">
					{['Alice', 'Bob', 'Priya', 'John', 'Sarah', 'Alex', 'Emma', 'David'].map(
						(name, idx) => (
							<div key={name} className="flex flex-col items-center">
								<img
									src={`/images/avatar${(idx % 3) + 1}.png`}
									alt={name}
									className="w-14 h-14 rounded-full border-2 border-sky-950 mb-2 object-cover"
								/>
								<span className="text-sky-950 font-medium">{name}</span>
							</div>
						)
					)}
</div>
  )
}

export default Creaters