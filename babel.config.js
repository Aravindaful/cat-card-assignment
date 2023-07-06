export default function ()  {
   const presets = [
        ['@babel/preset-env', {targets: {node: 'current'}}]
    ];
  
    const plugins = [
      ];
  
    return {
      presets,
      plugins
    };
  };