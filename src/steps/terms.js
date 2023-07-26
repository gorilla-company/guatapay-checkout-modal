import utilsService from '../services/utils.service'

function createTerms() {
  const stepTerms = utilsService.createElementWithClass('div', 'modal-body-wrapper hide')
  stepTerms.id = 'step-TERMS'

  stepTerms.innerHTML = `
    <div class="terms-wrapper">
      <div class="terms-header">
        <h1>Terminos y Condiciones</h1>
        <p>Ultima actualización: 07 de Julio de 2023</p>
      </div>
      <div class="terms-item">
        <p>¡Bienvenid@! En este documento encontrarás los Términos y Condiciones de Guatapay. Recuerda leerlos, pues aplica a Usuarios, así como a cualquier otro tercero aliado y proveedor de bienes o servicios, que opere o navegue por la plataforma.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">AVISO IMPORTANTE:</span> Por el hecho de ingresar a nuestro sistema, entendemos la aceptación y conocimiento por parte tuya de los términos y condiciones y de nuestra Política de Privacidad.</p>
      </div>
      <div class="terms-item">
        <h4>1. Definiciones:</h4>
      </div>
      <div class="terms-item">
        <p>Te expondremos el alcance de algunas definiciones que serán implementadas a lo largo de los presentes Términos y
          Condiciones que deberás aceptar a fin de tener acceso a los productos y servicios provistos:</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.1. Guatapay:</span> Sociedad debidamente constituida bajo la legislación colombiana, país en donde se encuentra su establecimiento permanente, que cuenta con productos y servicios desde un entorno remoto que permite, a través de su producto Guatapay, efectuar operaciones con Activos Virtuales entre Comercios y Usuarios.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.2. Canal:</span> Se refiere a personas jurídicas o físicas, que cuenta con varios comercios asociados respecto de los cuales se implementa Guatapay.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.3. Comercios:</span> Se refiere a, personas jurídicas o físicas, tiendas virtuales o establecimientos de comercio físicos.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.4. Activos Digitales:</span> Bienes fungibles susceptibles de valoración.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.5. Liquidación:</span> Implica obtener moneda FIAT de la transacción de una Activo Digital.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.6. Mandato:</span> Figura contractual que le permitirá a Guatapay de manera única, exclusiva y específica hacer uso del monto establecido por el Usuario Pagador para la adquisición de bienes o servicios de los canales habilitados del Comercio a través de Activos Virtuales.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.7. Moneda:</span> Unidad de valor que permite la adquisición de bienes y servicios FIAT.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.8. Pagador:</span> Persona natural que utiliza el servicio y productos prestados por Guatapay como pagador de un bien o servicio que ofrece el Comercio.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.9. Plataforma o sitio Web:</span> Hace referencia a la página web dispuesta por medios digitales y en donde podrás tener acceso a los diversos servicios y productos provistos por Guatapay.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.10. Tasa de cambio:</span> Relación que existe entre la diferencia del valor derivado de las operaciones con Activos Virtuales y la moneda FIAT con la que se tranza la relación comercial entre Usuarios y Comercios.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">1.11. Usuario:</span> Persona natural o jurídica la cual interactúa con la Plataforma.</p>
      </div>
      <div class="terms-item">
        <h4>2. Condiciones de uso</h4>
      </div>
      <div class="terms-item">
        <p>Por ingresar a la plataforma tu aceptas que:</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">2.1.</span> Necesitas de dispositivos compatibles (PC o Móvil), acceso a Internet, cierto nivel de software y cierto nivel de comunicaciones;
        </p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">2.2.</span> Realizamos actualizaciones periódicas pudiendo modificarlos. Por esto, puede realizarse un mantenimiento de la plataforma, y es posible que el Servicio no esté disponible en cualquier momento del día.</p>
      </div>
      <div class="terms-item">
        <h4>3. La relación</h4>
      </div>
      <div class="terms-item">
        <h4>3.1. El servicio a prestar</h4>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">3.1.1. Para los Pagadores:</span> Comprendes que el servicio que presta Guatapay a través de su Plataforma consiste en permitir una operación de adquisición de bienes, productos o servicios de los canales habilitados a través de Comercios aliados por medio de Activos digitales que hace Guatapay en tu nombre en calidad de mandatario, tomando en cuenta que los activos intangibles o inmateriales han sido catalogados por parte de la máxima autoridad cambiaria y monetaria en Colombia, y si bien no se encuentran catalogados como moneda, tiene un valor especificado en el mercado como bien intangible.</p>
      </div>
      <div class="terms-item">
        <p>Para realizar lo anterior realizamos el siguiente procedimiento:</p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">3.1.1.1. Obtenemos tus Activos digitales;</p>
        <p class="terms-subtitle">3.1.1.2. Realizamos una liquidación con los Activos digitales ofrecidos, con el objetivo de obtener dinero FIAT;</p>
        <p class="terms-subtitle">3.1.1.3. Guatapay, en cuestión de segundos, realiza el pago de los bienes, productos o servicios al Comercio;</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">3.1.2. Para los Comercios:</span> Comprendes que el servicio que presta Guatapay a través de su Plataforma, el cual consiste en permitir una operación de adquisición de tus bienes, productos o servicios ofrecidos por ti por medio de una liquidación con los Activos Digitales ofrecidos por el Pagador.</p>
      </div>
      <div class="terms-item">
        <h4>3.2. Regulación – No somos Entidad Financiera</h4>
      </div>
      <div class="terms-item">
        <p>Recuerda que Guatapay NO es una Entidad Financiera. No estamos relacionados con el sector financiero ni intermediario del mercado cambiario; principalmente por que en ninguna de nuestras operaciones realizamos captación de dinero del público.</p>
      </div>
      <div class="terms-item">
        <h4>3.3. Operación y Mandato para los Pagadoresa</h4>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">3.3.1.</span> Tú como Pagador, a partir de la aceptación de los presentes Términos y Condiciones, otorgas un mandato sin representación a Guatapay para que de manera única, exclusiva y específica haga la liquidación de los Activos Virtuales ofrecidos.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">3.3.2.</span> Asimismo, brindas un mandato expreso, previo y por escrito para realizar las operaciones de arbitramiento, con el objetivo de Guatapay obtenga la moneda FIAT requerida y pueda pagar la adquisición de bienes, productos o servicios indicados.</p>
      </div>
      <div class="terms-item">
        <p><span class="terms-subtitle">3.3.3.</span> Para la operación con los pagadores, Guatapay deberá identificar plenamente el valor del arbitraje que se llevará a cabo. Por lo anterior, hemos desarrollado la "Tasa de cambio" a la cual Guatapay realizará la venta de los Activos Digitales. Esta tasa se actualiza cada treinta (30) segundos, por lo que si existe una demora en efectuar el pago que supere los treinta (30) segundos el valor se reliquidará.
        </p>
      </div>
      <div class="terms-item">
        <h4>3.4. Uso de datos personales</h4>
      </div>
      <div class="terms-item">
        <p>
          Para hacer el proceso 100% digital, es necesario el tratamiento de tus datos personales, para los cuales deberás aceptar una autorización en el momento en que te registres en la plataforma.
        </p>
      </div>
      <div class="terms-item">
        <p>
          Toda tu información será almacenada en ficheros de datos de carácter personal y/o comercial y/o archivos y/o mensajes de datos digitalizados de propiedad de Guatapay, que manejará conforme a la Ley, los cuales son necesarios para el uso de las funcionalidades de los Servicios, según la Política de Privacidad, que puede ser consultada en: https:// www.guatapay.com
        </p>
      </div>
      <div class="terms-item">
        <p>
          <span class="terms-subtitle">Responsable:</span> Guatapay es el responsable del tratamiento de los datos personales, pues será quien decida sobre labase de datos y/o tratamiento de los mismos.
        </p>
      </div>
      <div class="terms-item">
        <p>En la Política de Privacidad podrás identificar:</p>
      </div>
      <div class="terms-item">
        <p>• El tratamiento al cual serán sometidos;</p>
        <p>• la finalidad con la que es recaudado el dato personal;</p>
        <p>• Los derechos que le asisten como Titular;</p>
        <p>• La información; y</p>
        <p>• Los canales de comunicación a través de los cuales los Titulares pueden ejercer sus derechos ante el Responsable y/o Encargado del Tratamiento y el carácter facultativo que tiene el Titular de dar o no respuesta a preguntas que versen sobre datos sensibles.</p>
      </div>
      <div class="terms-item">
        <h4>3.5. Limitación de responsabilidad</h4>
      </div>
      <div class="terms-item">
        <p>
          En el Sitio web serán ofrecidas conexiones (Links) para otros sitios que consideramos pueden ser de interés para ti, los cuales son operados por personas distintas a Guatapay, por lo cual, la compañía (Guatapay) no se hace responsable bajo ningún respecto por la información contenida en ellos, ni por las consecuencias de la utilización de los mismos.
        </p>
      </div>
      <div class="terms-item">
        <p>La conexión a otros sitios es de exclusiva responsabilidad del usuario.</p>
      </div>
      <div class="terms-item">
        <h4>4. Usuarios</h4>
      </div>
      <div class="terms-item">
        <h4>4.1. Definiciones de Perfil</h4>
      </div>
      <div class="terms-item">
        <p>
          <span class="terms-subtitle">4.1.1. Comercio: El Pagador hace referencia única y exclusivamente al usuario verificado representante legal o administrador autorizado de una persona jurídica quien será responsable por la Compañia a la que representa ante terceros y por el uso de la cuenta de usuario asignada en la plataforma. Un comercio podrá autorizar tantos perfiles como desee, asignándoles los permisos que mejor se ajusten al perfil deseado de acceso a la información.
        </p>
      </div>
      <div class="terms-item">
        <p>
          <span class="terms-subtitle">4.1.2. Pagador: El Pagador en la Plataforma es aquel usuario verificado como persona natural o jurídica la cual, por medio de la Plataforma, deseará obtener los bienes, productos y/o servicios del comercio, y el cual ofrecerá Activos digitales como contraprestación.
        </p>
      </div>
      <div class="terms-item">
        <h4>4.2. Vinculación y Validación</h4>
      </div>
      <div class="terms-item">
        <p>
          Para acceder al portafolio de servicios que ofrece Guatapay, los usuarios deben completar un proceso de vinculación a la plataforma y convertirse en usuarios verificados. La vinculación en la plataforma es un proceso completamente automatizado y digital, es decir, los usuarios no deben llenar formularios físicos de ningún tipo ni realizar trámites de manera presencial. Los pasos para la vinculación se establecen a continuación:
        </p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.2.1. Verificación de correo electrónico</p>
      </div>
      <div class="terms-item">
        <p>
          El usuario debe inscribir el correo electrónico y/o teléfono que desee vincular a la cuenta, un e-mail u OTP de verificación es enviado al Usuario y sólo podrá continuar con el proceso una vez haya verificado su cuenta de correo.
        </p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.2.2. Formularios</p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.2.2.1. Formulario de Información Básica</p>
        <p>
          El usuario debe relacionar su número de documento de identidad, dirección de domicilio y número telefónico; así mismo deberá adjuntar una imagen o foto del usuario y una imagen frontal y posterior de su documento de identidad para que el sistema realice internamente las siguientes validaciones:</p>
      </div>
      <div class="terms-item">
        <p>
          • La validación del documento: Determinará el cumplimiento de las características físicas y tecnológicas propias de una cédula de ciudadanía colombiana, tales como el holograma laminado, el fondo de seguridad anti-fotográfico y las distancias entre la información pre-impresa y los datos biográficos y los demás elementos del documento.
        </p>
        <p>
          • La validación de la titularidad del documento: Esto se hace comparando la foto a color impresa en la cédula de ciudadanía con la imagen o foto del usuario y comparando la información alfanumérica extraída de los datos biográficos de la cédula de ciudadanía con los datos ingresados por el usuario.</p>
        <p>
          • La validación del celular: El sistema validará el número de celular del usuario enviando un código de verificación que debe ingresar en la plataforma para confirmar que tiene acceso a ese número.</p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.2.2.2. Perfil de usuario</p>
        <p>Existen dos (2) perfiles con los que un usuario puede registrarse en la plataforma:</p>
      </div>
      <div class="terms-item">
        <p>• Persona Natural actuando en nombre propio.</p>
        <p>• Persona Jurídica.</p>
      </div>
      <div class="terms-item">
        <p>
          Dentro del perfil de persona jurídica existen tres (3) modalidades bajo las cuales un usuario puede realizar su registro:</p>
      </div>
      <div class="terms-item">
        <p>• Representante Legal de una Compañia.</p>
        <p>• Administrador autorizado de una sucursal.</p>
        <p>• Empleado autorizado de una Compañia.</p>
      </div>
      <div class="terms-item">
        <p>
          Es necesario mencionar que solo el representante legal de una Compañía, el administrador autorizado de una sucursal y el Empleado autorizado de una Compañía pueden suministrar la documentación requerida.
        </p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.2.2.3. Registro de Compañía</p>
        <p>
          Para registrar una Compañía en el sistema, la plataforma le solicitará al usuario el Número de Identificación Tributario (NIT) de la Compañía. Si la Compañía ya está creada en, el sistema le arrojará inmediatamente este resultado y lo invitará a hacer parte de la Compañía bajo el perfil de Empleado de una Compañía. Este usuario solo podrá hacer uso de la plataforma una vez el representante legal de la Compañía a la que se vinculó lo autorice a través de la plataforma y le otorgue los permisos que correspondan.
        </p>
      </div>
      <div class="terms-item">
        <p>
          Cuando la Compañía no se encuentra en la base de datos de la plataforma, y el usuario que realiza la vinculación es un empleado, el sistema le solicitará al usuario los datos de contacto del representante legal de la Compañía; donde un correo electrónico será enviado de manera automática al representante legal invitándolo a iniciar el proceso de vinculación.</p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.2.2.4. Formulario Información de la Compañia y documentos</p>
        <p>
          Si la Compañía no ha sido creada previamente en la plataforma, y el usuario que realiza la vinculación es el representante legal, el sistema le permite al usuario continuar al formulario de información de la Compañia, en donde se le solicita que relacione la información de la compañía y adjunte los documentos requeridos por la plataforma.
        </p>
      </div>
      <div class="terms-item">
        <p>
          Guatapay exige la actualización de determinados documentos al menos una (1) vez al año. La plataforma envía una alerta a cada usuario cuando su documentación se encuentra próxima a vencer. Si el usuario no actualiza sus documentos, su cuenta se desactivará hasta que realice la actualización. El cambio en la situación fiscal de un usuario requiere también de la actualización de documentos y cada usuario estará en la obligación de hacerlo y/o reportarlo.
        </p>
      </div>
      <div class="terms-item">
        <p>
          El perfil del usuario que ha actualizado su documentación queda nuevamente pendiente por verificar hasta que el sistema realice la validación correspondiente.
        </p>
      </div>
      <div class="terms-item">
        <h4>4.3. Derechos y Deberes</h4>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.3.1. Derechos de Guatapay y la Plataforma</p>
      </div>
      <div class="terms-item">
        <p>
          a. Los administradores de la Plataforma tienen derecho a modificar el sitio web y su contenido, sin necesidad de consentimiento de los usuarios registrados en el sistema siempre que lo consideren necesario.
        </p>
        <p>
          b. Guatapay tiene derecho a dar por terminado los presentes Términos y Condiciones con un usuario registrado previamente en la Plataforma, si éste ha incurrido en alguna de las causales de bloqueo de usuarios descrita en la sección Políticas de Bloqueo de usuario de este documento. Para estos casos, Guatapay se reserva el derecho a decidir si el bloqueo de un usuario es permanente de acuerdo a la gravedad de las causales del bloqueo.
        </p>
        <p>
          c. Los administradores de la Plataforma tienen derecho a solicitar la información que requieran para completar el proceso de registro de los usuarios.
        </p>
        <p>
          d. Guatapay se reserva el derecho de comunicar al usuario las causales por las cuales su perfil ha sido bloqueado.
        </p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.3.2. Deberes de Guatapay y la Plataforma</p>
      </div>
      <div class="terms-item">
        <p>
          a. Los administradores de la plataforma tienen el deber de informar a los usuarios registrados en el sistema siempre que haya una modificación en una de las cláusulas de los términos y condiciones de uso de la Plataforma y/o en cualquier documento que requiera la aceptación del usuario. En el caso de alguna modificación, este será reportada a los Usuarios y si no hay argumento en contra dentro de los siguientes quince (15) días, se entenderá aceptada por los Usuarios.
        </p>
        <p>
          b. Guatapay tiene el deber de tratar los datos personales de los usuarios registrados en la Plataforma de acuerdo a la Política de Tratamiento de Datos Personales establecida por la plataforma y de conformidad con la autorización al tratamiento de datos que da el usuario al momento de vincularse en la Plataforma.</p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.3.3. Derecho de los Usuarios</p>
      </div>
      <div class="terms-item">
        <p>
          a. Es derecho de los usuarios conocer oportunamente los cambios hechos por Guatapay a las condiciones de loscontratos suscritos o a cualquier documento que requiera su aceptación.
        </p>
        <p>
          b. Es derecho de los usuarios recibir apoyo integral y oportuno frente a cualquier inquietud sobre el uso de la Plataforma.
        </p>
      </div>
      <div class="terms-item">
        <p class="terms-subtitle">4.3.4. Deberes de los Usuarios</p>
      </div>
      <div class="terms-item">
        <p>
          a. Es deber de los usuarios registrar en la Plataforma información verídica y documentos reales que correspondan asu identidad.
        </p>
        <p>
          b. Es deber de los usuarios abstenerse de utilizar la plataforma para la realización de actividades ilícitas, en especial aquellas relacionadas con el lavado de activos, la captación masiva y habitual de dineros del público sin estar autorizado para ello y la financiación del terrorismo.
        </p>
        <p>
          c. Es deber de los usuarios actualizar su información y documentación cuando así sea requerido por parte de la Plataforma.
        </p>
        <p>
          d. Es deber de los usuarios contar con el hardware y software compatible con la Plataforma, al igual que contar con el acceso a Internet a su propio costo y riesgo, necesario para el uso adecuado de la Aplicación.
        </p>
      </div>
      <div class="terms-item">
        <h4>4.4. Políticas de Bloqueo</h4>
      </div>
      <div class="terms-item">
        <p>
          El usuario podrá ser bloqueado en el sistema por el administrador de la Plataforma si este incurre en una o más de
          las siguientes causales:
        </p>
      </div>
      <div class="terms-item">
        <p>
          a. En el caso en que la información suministrada por el usuario sea falsa, inexacta, errónea o poco fidedigna, aun cuando el sistema ha solicitado mayor información al respecto.
        </p>
        <p>
          b. En el caso en que un usuario haga caso omiso de la solicitud de información adicional o actualización de
          documentación por parte de Guatapay, en un término no mayor a quince (15) días
        </p>
        <p>
          c. En caso de uso no autorizado o indebido de la Plataforma, es decir, que se atribuya facultades que no corresponden a su perfil o en caso de utilizar el sistema para usos no establecidos en el Reglamento de la Plataforma.
        </p>
        <p>
          d. En caso de no pago de las comisiones correspondientes a Guatapay.
        </p>
        <p>
          e. Por solicitud de una autoridad competente administrativa o judicial.
        </p>
        <p>
          f. En el evento en que el usuario incumpla las obligaciones con su contraparte en una transacción o acuerdo por la adquisición de bienes, productos o servicios.
        </p>
        <p>
          g. En el caso en que el usuario incurra en una infracción de las obligaciones adquiridas en cualquier documento que requiera su aceptación.
        </p>
        <p>
          h. En el evento en que sea evidenciado que los usuarios transan las facturas registradas en el sistema por fuera del mismo, previo acuerdo de las tasas o de las condiciones del acuerdo dentro del sistema.
        </p>
        <p>
          i. Cuando se tengan indicios que la cuenta del usuario está siendo usada para la realización de actividades ilícitas.
        </p>
      </div>
      <div class="terms-item">
        <h4>4.5. Disponibilidad de la Plataforma & responsabilidad</h4>
      </div>
      <div class="terms-item">
        <p>
          La Plataforma garantiza la conservación de la información y la trazabilidad de las actividades entre Pagadores y Comercios, mediante la adopción de mecanismos eficaces de control y salvaguardia de sus sistemas informáticos y la implementación de planes de contingencia o sistemas de respaldo que mitiguen la ocurrencia de fallas operativas o tecnológicas.
        </p>
      </div>
      <div class="terms-item">
        <h4>4.6. Exoneración de responsabilidad de Plataforma</4>
      </div>
      <div class="terms-item">
        <p>Guatapay no se responsabiliza por:</p>
      </div>
      <div class="terms-item">
        <p>
          a. Cualquier daño, perjuicio o pérdida al Usuario, causados por fallas en el sistema, en el servidor, en Internet o en el sitio web de la Plataforma, los cuales no sean oponibles a sus servicios. No es responsable por los perjuicios que pueda sufrir el suscriptor, como consecuencia de fallas técnicas, de comunicaciones, transmisión de datos, fallas en el computador o cualquier otra falla ajena como administrador.
        </p>
        <p>
          b. Cualquier virus que pudiera infectar el equipo del Usuario como consecuencia del acceso, uso o examen del sitio web de la plataforma o a raíz de cualquier transferencia de datos, archivos, imágenes, textos, o audios contenidos en el mismo.
        </p>
        <p>
          c. El uso continuado del sitio web de la Plataforma, ya que ésta puede en cualquier momento y por cualquier razón, no estar disponible por dificultades técnicas o fallas de Internet, o por cualquier otra circunstancia ajena a la misma, que en todo caso se propenderá por restablecer los servicios lo antes posible.
        </p>
        <p>
          d. Procura que toda la información contenida, sea verificada, pero tratándose de información directamente suministrada por los usuarios, no se garantiza la exactitud, integridad, confiabilidad o vigencia del material, conexiones, o del resultado que se obtenga del uso del Sitio Web/Aplicativo y de sus servicios.
        </p>
        <p>
          e. No es responsable por los perjuicios que pueda sufrir un Usuario de la plataforma, como consecuencia de fallas técnicas, de comunicaciones, transmisión de datos, fallas en el computador o cualquier otra falla ajena como administrador del sitio.
        </p>
      </div>
      <div class="terms-item">
        <h4>4.7. Prohibiciones</h4>
      </div>
      <div class="terms-item">
        <p>
          Las Partes se obligan a no utilizar los servicios ofrecidos por la Plataforma para fines ilícitos, así mismo se abstendrá de utilizar los medios puestos a su disposición, para la prestación del servicio para:
        </p>
      </div>
      <div class="terms-item">
        <p>
          a. Crear o tratar de crear una identidad falsa con el propósito de engañar a las partes o a terceros respecto a la identidad del remitente o del origen de sus mensajes;
        </p>
        <p>
          b. Transmitir o cargar archivos que contengan virus, caballos de Troya, gusanos, bombas de tiempo, robots de cancelación de noticias, o cualesquiera otros programas perjudiciales o nocivos;
        </p>
        <p>
          c. Transmitir o cargar materiales que contengan software u otros materiales protegidos por la legislación relativa a la propiedad intelectual, el derecho a la intimidad o a la propia imagen o por cualquier otra legislación o derecho aplicable;
        </p>
        <p>
          d. Interferir o interrumpir redes conectadas con el servicio o infringir las normas, directivas o procedimientos dedichas redes;
        </p>
        <p>
          e. Intentar obtener acceso de forma no autorizada a los servicios prestados a través de medios electrónicos, al igual que a cualquier sistema informático o red conectados con los servicios ofrecidos, a través de búsqueda automática de contraseñas o por cualquier otro medio, incluidos los que impliquen la utilización en cualquier forma de los implementos suministrados;
        </p>
        <p>
          f. Interferir con el uso o disfrute de los servicios por parte de otros clientes de otras personas o entidades;
        </p>
        <p>
          g. Obtener información de terceros, siendo entendido que, si de cualquier manera accede a ella, debe mantener la
          reserva del caso y responder por los perjuicios que cause la violación de la misma.
        </p>
        <p>
          h. Realizar cualquier otro acto que pueda generar perjuicios a las partes.
        </p>
      </div>
      <div class="terms-item">
        <p>
          Las partes se obligan a mantener y aplicar en sus transacciones y negocios los procedimientos, herramientas, sistemas y métodos eficaces para evitar que alguna parte sea sujeto de lavado de activos, y mantendrá indemne de todo perjuicio causado por tal situación.
        </p>
      </div>
      <div class="terms-item">
        <h4>5. Indemnidad</h4>
      </div>
      <div class="terms-item">
        <p>
          Recuerda que ante cualquier uso de la plataforma, tienes una obligación de mantener indemne y responder frente a Guatapay, sus directores, empleados y licenciantes por cualquier reclamación, demanda, pérdida, responsabilidad y gasto (incluidos los honorarios de abogados) que deriven de: (i) El uso de los Servicios, (ii) Incumplimiento o violación de cualquiera de estos Términos y Condiciones; (iii) El uso por parte de Guatapay de su Contenido de usuario; o (iv) Su infracción de los derechos de cualquier tercero, incluidos los operadores de libranza.
        </p>
      </div>
      <div class="terms-item">
        <h4>6. Cargos</h4>
      </div>
      <div class="terms-item">
        <p>
          • Cada uno de nuestros servicios tiene un cargo y, por ende, hemos creado un "mensaje resumen" previo a cuando se te vaya a realizar cualquier tipo de operación. Esta liquidación de cargos está destinada para compensar plenamente nuestros servicios y, por ende, no aceptamos ningún tipo de pago "extra".
        </p>
        <p>
          • Recuerda que la omisión del pago genera intereses de mora, gastos de cobranza y reporte en las centrales de riesgo.
        </p>
        <p>
          • Los cargos aplicables son los mismos en todas las zonas geográficas del país y no se incrementarán durante periodos de alta demanda.
        </p>
      </div>
      <div class="terms-item">
        <h4>7. Modificación</h4>
      </div>
      <div class="terms-item">
        <p>• Guatapay se reserva el derecho a modificar, suspender o descontinuar el Servicio, total o parcialmente, (o
          cualquier parte o contenido) en cualquier momento, con o sin mediar notificación, y no será responsable frente a tales efectos.
        </p>
        <p>
          • Toda modificación a la información del procedimiento de Guatapay será informado oportunamente y serán efectivas después que Guatapay las publique en su página web.
        </p>
        <p>
          • Si accedes a la plataforma después de dicha publicación, constituye un consentimiento a vincularse a los nuevos Términos y Condiciones complementarios y/o sus modificaciones.
        </p>
      </div>
      <div class="terms-item">
        <h4>8. Quejas, Disputas y Solución de conflictos</h4>
      </div>
      <div class="terms-item">
        <p>
          Cualquier disputa, conflicto, reclamación o controversia, del tipo que sea, deberán someterse a procedimiento de mediación directa. Para lo anterior, Guatapay también podrá utilizar para sí, o facilitar a sus licenciantes, cualquier información necesaria para resolver quejas, disputas o solucionar algún conflicto que se llegue a presentar (PQRS) que se recibirán a través de hola@guatapay.com
        </p>
      </div>
      <div class="terms-item">
        <h4>9. Derechos de Propiedad Intelectual.</h4>
      </div>
      <div class="terms-item">
        <p>
          Las marcas, avisos, nombres comerciales, propaganda comercial, dibujos, diseños, logotipos, textos, etc., que aparecen en el sitio web de Guatapay son de exclusiva propiedad de Guatapay, o de terceros que de manera previa y  expresa han autorizado a ésta para su uso.
        </p>
      </div>
      <div class="terms-item">
        <p>
          Queda prohibido cualquier uso o explotación por cualquier medio, sin el consentimiento previo y por escrito de SCRUMMERS, de cualquier contenido.
        </p>
      </div>
      <div class="terms-item">
        <p>
          El diseño y contenido del Sitio Web se encuentra protegido de conformidad con lo establecido por las normas nacionales e internacionales de protección de la Propiedad Industrial y del Derecho de Autor, quedando prohibido: modificar, copiar, distribuir, transmitir, desplegar, publicar, editar, vender, o de cualquier forma explotar el diseño y contenido del Sitio Web.
        </p>
      </div>
      <div class="terms-item">
        <h4>10. Terminación</h4>
      </div>
      <div class="terms-item">
        <p>
          Si Guatapay tiene razones suficientes para considerar que no has cumplido con las reglas, podrá, a su exclusivo criterio y sin necesidad de darle previo aviso, optar por: (i) Dar por terminado el presente Acuerdo, (ii) Terminar la licencia del Servicio; o (iii) Impedir el acceso al Servicio o cualquier parte del mismo.
        </p>
      </div>
      <div class="terms-item">
        <p>
          Recuerda revisar estas secciones para estar informado de las modificaciones que pudieran realizársele a las mismas, pues cada nuevo acceso a la página web será considerado por Guatapay como una aceptación tácita de las nuevas condiciones.
        </p>
      </div>
      <div class="terms-item">
        <p>
          Si no estás de acuerdo con estos Términos y Condiciones o con cualquier disposición de la Política de Privacidad, te sugerimos abstenerte de acceder/navegar a nuestros servicios.
        </p>
      </div>
    </div>
  `

  // Accept Button
  const acceptButton = document.createElement('button')
  acceptButton.classList.add('guatapay-btn-primary')
  acceptButton.innerHTML = 'Estoy de acuerdo'
  acceptButton.addEventListener('click', async () => {
    await window.setModalStatus('QUOTATION')
    // await window.setModalStatus('PROCESSING')
  })

  // Cancel Button
  const cancelButton = document.createElement('button')
  cancelButton.classList.add('guatapay-btn-secondary')
  cancelButton.innerHTML = 'Cancelar'
  cancelButton.addEventListener('click', () => {
    window.setModalStatus('START')
  })

  // Buttons Wrapper (align left)
  const buttonsWrapper = document.createElement('div')
  buttonsWrapper.classList.add('buttons-left-wrapper', 'mt-32')
  buttonsWrapper.appendChild(cancelButton)
  buttonsWrapper.appendChild(acceptButton)

  stepTerms.appendChild(buttonsWrapper)
  return stepTerms
}

export default {
  createTerms
}
