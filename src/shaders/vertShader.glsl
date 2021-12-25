varying vec3 pos;
varying vec2 vUV;
varying vec3 n;
uniform float iTime;
// uniform mat3 normalMatrix;

float height(vec3 p,vec3 n){

	//DENTED
	float up =  max(0.,dot(n,vec3(0.,1.,0.)));
	float s = sin(p.y*10.)/20.;

	return 0.;
}

vec3 normal_arb(vec3 p,vec3 n) {
    
    //vec3 n = vec3(0.,0.,-1.);
    
    vec3 f;
    vec3 r;
    
    if(n.z < -0.999999)
    {
        f = vec3(0. , -1., 0.);
        r = vec3(-1., 0., 0.);
    }
    else{
    
        float a = 1./(1. + n.z);
        float b = -n.x*n.y*a;

        f = vec3(1. - n.x*n.x*a, b, -n.x);
        r = vec3(b, 1. - n.y*n.y*a , -n.y);
    }
    
    float eps = -0.00001;
    
    float x = height(p + eps*f,n) - height(p - eps*f,n);
    float y = height(p + eps*r,n) - height(p - eps*r,n);
    float z = -2.*eps;
    
    vec3 norm = x*f + y*r + z*n;
    norm = normalize(norm);
    
    return norm;
} 

void main()
{

	vec3 newPos = position + 0.*vec3(-5.,0.,-10.);
	//pos = position;
	vUV = uv;

	//vec3 modelNorm = (modelMatrix*vec4(normal,1.)).xyz;
	vec3 modelNorm = normalMatrix*normal;
	n = normal;
	//n = modelNorm;



	

	vec4 modelPosition = (modelMatrix*vec4(position,1.));

	vec3 newNormal = normal_arb(modelPosition.xyz,n);
	n = newNormal;

	float h = height(modelPosition.xyz,n);


	float offsetOn = 0.;
	vec3 offset = h*normal;

	modelPosition.xyz += offset;
	pos = modelPosition.xyz; //World Position

	vec4 modelViewPosition = viewMatrix*modelPosition;
	gl_Position = projectionMatrix * modelViewPosition;

}