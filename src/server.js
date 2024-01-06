import app from './app.js';
import { initModel } from './config/database/associations.js';
import { authenticated, syncd } from './config/database/database.js';
import { envs } from './config/enviroments/enviroments.js';
//authenticated() es una función asíncrona que estás esperando (await), lo que sugiere que devuelve una promesa. La palabra clave await se utiliza para pausar la ejecución de la función hasta que la promesa se resuelva o se rechace.
async function main() {
  try {
    await authenticated();
    initModel();
    await syncd();
  } catch (error) {
    console.error(error);
  }
}
main();

//app.listen(envs.PORT, ...) indica que tu aplicación (presumiblemente una instancia de Express) va a escuchar en un puerto específico.

app.listen(envs.PORT, () => {
  console.log(`Server running on port ${envs.PORT}👻`);
});

