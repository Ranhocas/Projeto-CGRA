/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i <= this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            // console.log("SA: ", sa);
            // console.log("SAA: ", saa);
            // console.log("CA: ", ca);
            // console.log("CAA: ", caa);

            this.vertices.push(ca, 0, -sa);     // 0 / 6
            this.vertices.push(caa, 0, -saa);   // 1
            this.vertices.push(ca, 1, -sa);     // 2
            
            this.vertices.push(ca, 1, -sa);     // 3
            this.vertices.push(caa, 0, -saa);   // 4
            this.vertices.push(caa, 1, -saa);   // 5

            // triangle normal computed by cross product of two edges

            /*
            this.normals = [];
            for (int i = 0; i < 6; i++)
            {
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            }
            */

            /* var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ]; */

            // var normal= [
            //     ca,
            //     0,
            //     sa
            // ];


            // // normalization
            // var nsize=Math.sqrt(
            //     normal[0]*normal[0]+
            //     normal[1]*normal[1]+
            //     normal[2]*normal[2]
            //     );

            // normal[0]/=nsize;
            // normal[1]/=nsize;
            // normal[2]/=nsize;

            //push normal once for each vertex of this triangle
            for(var n = 0; n < 6; n++){
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            }   

            // Isto tá mal, temos de ver como fazer os índices

            //this.indices.push(3*i, (3*i+1) , (3*i+2));
            //this.indices.push((3*i+3), (3*i+4) , (3*i+5));

            this.indices.push(6*i, (6*i+1), (6*i+2));
            this.indices.push((6*i+3), (6*i+4), (6*i+5));

            this.indices.push((6*i+3), (6*i+4), (6*i+5));
            this.indices.push((6*i+5), (6*i+4), (6*i+3));

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


