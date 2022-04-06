
const isAdmin = (req,res = response,next) =>{

    if(!req.usuario){
        return res.status(500).json({msg:"Se quiere verificar el rol sin validar el token primero"});
    }
    const {role, name} = req.usuario;
    if(role !=='ADMIN_ROLE'){
        return res.status(401).json({msg: `${name} no tiene permisos de administrador`});
    }
    next();
}
const validarRole = (...roles) =>{

    return (req,res = response,next) =>{
        if(!req.usuario){
            return res.status(500).json({msg:"Se quiere verificar el rol sin validar el token primero"});
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({msg:`El servicio requiere algún rol especifico ${roles}`});
        }

        next();
    }
}

module.exports = {
    isAdmin,
    validarRole
}