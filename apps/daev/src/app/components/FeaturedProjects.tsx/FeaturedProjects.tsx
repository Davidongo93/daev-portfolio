const FeaturedProjects: React.FC = () => {
    return (
      <section className="bg-gray-900 text-white flex flex-col justify-center items-center">
        <div className="h-svh w-full p-5">
          <h2 className="text-3xl font-bold mb-4 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">Project A</div>
            <div className="bg-gray-800 p-4 rounded-lg">Project B</div>
            <div className="bg-gray-800 p-4 rounded-lg">Project C</div>
          </div>
          <div className="text-center mt-4">
            <p className="text-lg">Ready to bring your project to life?</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4">
              Let's Discuss Your Project
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturedProjects;
  