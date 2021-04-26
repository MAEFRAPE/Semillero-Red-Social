import { Injectable } from '@angular/core';
import { Grupos } from 'src/app/models/grupos.class';
import { Publicacion } from 'src/app/models/publicacion.class';
import { Usuario } from 'src/app/models/usuario.class';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor() { }

  notificar(listaPublicaciones:Publicacion[],elem:any,listaAlluser:Usuario[],usuario:Usuario,listaGrupos:Grupos[],listaUsuarios:Usuario[]){
    console.log("En el servicio",listaPublicaciones,elem,listaAlluser,usuario)

    if(elem.event==="new::post"){

      listaPublicaciones.unshift(elem.post)
      if(elem.post.user_id!= usuario.ID){

        Swal.fire({
          position: 'top-end',
          title: ` ${elem.post.user?.name} a realizado una nueva publicacion.` ,
          showConfirmButton: false,
          timer: 2000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })

      }
      

    }
    
    listaPublicaciones.forEach(obj =>{
      if (elem.event=== "new::reaction") {
        if (obj.ID=== elem.reaction.post_id) {
          if (obj.reactions) {
            obj.reactions.push(elem.reaction)
          }else{
            obj.reactions=[elem.reaction]
          }
          
          const user=listaAlluser.find(use=>{
            
            return use.ID===elem.reaction.user_id
         })

         if(user?.ID!== undefined){

          Swal.fire({
            position: 'top-end',
            title: ` A ${user?.name} le gusta tu publicacion.` ,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })

         }
        
        }
        
        return
      } 
    
      if (elem.event=== "remove::reaction") {
        if (!obj.reactions) {
            return
          }

          const reaccion= obj.reactions.find(r=>{

            const user=listaAlluser.find(user=>{
              user.ID===elem.reaction.user_id
           })
            
            return r.user_id===usuario.ID
          })
          if (reaccion) {
            obj.reactions.splice(obj.reactions.indexOf(reaccion),1)
          }

      }

        if (elem.event=== "new::comment") {
          if (obj.ID=== elem.comment.post_id) {
            if (obj.comments) {
              obj.comments?.unshift(elem.comment)
            }else {
              obj.comments= [elem.comment]
            }
          }

          const usercomen=listaPublicaciones.find(user=>{
            return user.ID=== elem.comment.post_id
          })
          const usuarcom=listaAlluser.find(user=>{
            return user.ID=== usercomen?.user.ID
          })

            if (elem.comment.User.ID!=usuario.ID) {
              Swal.fire({
                position: 'top-end',
                title: `${elem.comment.User.name} Ha realizado un comentario` ,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }

            if (usercomen?.user.ID==usuario.ID) {
              Swal.fire({
                position: 'top-end',
                title: `${elem.comment.User.name} Comento tu publicacion` ,
                showConfirmButton: false,
                timer: 2000,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }


          
          return
        }
  })

  ////seguir

  if (elem.event=== "new::subuser") {
    if(elem.user_id===usuario.ID){
    const seguido=listaUsuarios.find(user=>{
      return user.ID===elem.followed_id
    })

    if (seguido) {
      listaUsuarios.splice(listaUsuarios.indexOf(seguido),1)
    }

    }

    const userid=listaAlluser.find(user=>{
      return user.ID=== elem.user_id
    })
    const fwd=listaAlluser.find(user=>{
      return user.ID=== elem.followed_id
    })
    if (fwd?.ID===undefined) {
      Swal.fire({
        position: 'top-end',
        title: `${userid?.name} Te ha empezado a seguir` ,
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return
    }

    if (userid?.ID===undefined) {
      Swal.fire({
        position: 'top-end',
        title: ` Haz empezado a seguir a ${fwd?.name}` ,
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return
    }
    Swal.fire({
      position: 'top-end',
      title: `${userid?.name} Ha empezado a seguir a ${fwd?.name} ` ,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    return
    
  }
  ////grupos

  if (elem.event=== "new::subgroup") {

    if(elem.user_id===usuario.ID){

      const grupo=listaGrupos.find(grou=>{
        return grou.ID===elem.group_id
      })

      Swal.fire({
        position: 'top-end',
        title: `Te haz unido al grupo ${grupo?.name}` ,
        showConfirmButton: false,
        timer: 2000,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

      if (grupo) {
        listaGrupos.splice(listaGrupos.indexOf(grupo),1)
      }

    }
   
  }


  }
}
