import React from 'react'

function ContainerComp({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto container px-4 max-w-screen-xl">
      {children}
    </div>
  );
}


export default ContainerComp
