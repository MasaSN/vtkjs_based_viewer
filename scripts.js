import vtkGenericRenderWindow from 'https://unpkg.com/vtk.js@latest/Sources/Rendering/Misc/GenericRenderWindow.js';
import vtkConeSource from 'https://unpkg.com/vtk.js@latest/Sources/Filters/Sources/ConeSource.js';
import vtkActor from 'https://unpkg.com/vtk.js@latest/Sources/Rendering/Core/Actor.js';
import vtkMapper from 'https://unpkg.com/vtk.js@latest/Sources/Rendering/Core/Mapper.js';



// --- Set up our renderer ---

const container = document.querySelector('#container');

// We use the wrapper here to abstract out manual RenderWindow/Renderer/OpenGLRenderWindow setup
const genericRenderWindow = vtkGenericRenderWindow.newInstance();
genericRenderWindow.setContainer(container);
genericRenderWindow.resize();

const renderer = genericRenderWindow.getRenderer();
const renderWindow = genericRenderWindow.getRenderWindow();


// --- Set up the cone actor ---

const actor = vtkActor.newInstance();
const mapper = vtkMapper.newInstance();

// this generates a cone
const coneSource = vtkConeSource.newInstance({
  height: 1.0,
});

// the mapper reads in the cone polydata
// this sets up a pipeline: coneSource -> mapper
mapper.setInputConnection(coneSource.getOutputPort());

// tell the actor which mapper to use
actor.setMapper(mapper);


// --- Add actor to scene ---

renderer.addActor(actor);


// --- Reset camera and render the scene ---

renderer.resetCamera();
renderWindow.render();


// --- Expose globals so we can play with values in the dev console ---

global.renderWindow = renderWindow;
global.renderer = renderer;
global.coneSource = coneSource;
global.actor = actor;
global.mapper = mapper;