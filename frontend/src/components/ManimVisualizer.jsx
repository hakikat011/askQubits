import React, { useEffect, useState } from 'react';

const ManimVisualizer = ({ query }) => {
  const [visualizationUrl, setVisualizationUrl] = useState(null);

  useEffect(() => {
    if (query) {
      // Assuming the visualization is saved with the query name in 'manim/outputs/'
      const encodedQuery = encodeURIComponent(query);
      setVisualizationUrl(`/visualizations/${encodedQuery}.png`);
    }
  }, [query]);

  return (
    <div className="p-4 bg-white bg-opacity-5 backdrop-blur-sm rounded-lg mt-4 text-center">
      <h3 className="text-lg font-semibold text-white">Visualization for "{query}"</h3>
      <div className="bg-white bg-opacity-10 h-48 mt-2 rounded-lg flex items-center justify-center">
        {visualizationUrl ? (
          <img src={visualizationUrl} alt={`Visualization for ${query}`} className="max-h-full" />
        ) : (
          <p className="text-gray-300">No visualization available.</p>
        )}
      </div>
    </div>
  );
};

export default ManimVisualizer;
