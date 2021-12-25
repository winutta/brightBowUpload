
#define PI 3.1415926538


varying vec3 pos;
uniform float iTime;
varying vec2 vUV;
varying vec3 n;
uniform sampler2D envMapBlur;
uniform sampler2D bbTex;

float getAngle(vec2 v1,vec2 v2)
{
    //return atan(v1.x,v1.y) -atan(v2.x,v2.y);
    return mod( atan(v1.x,v1.y) -atan(v2.x,v2.y), PI*2.)/PI/2.; //0 ... TWOPI
    //return mod( atan(v1.x,v1.y) -atan(v2.x,v2.y), TWOPI) - PI; //-pi to +pi 
}

vec4 getEnvMap(vec3 n,sampler2D envMap){
  float aXZ = getAngle(n.xz,vec2(1.,0.));
  float aUD = getAngle(vec2(length(n.xz),-n.y),vec2(0.,1.));
  return texture2D(envMap,fract(vec2(aXZ+0.5,aUD*2.)));
}

void main() {

  vec3 light = vec3(0., 2.,-0.5);
  vec3 lightDir = normalize(light-pos);

  vec3 viewDir = normalize(pos - cameraPosition);
  vec3 reflDir = reflect(viewDir,n);
  vec3 refrDir = refract(viewDir,n,1.33);

  float b2 = max(0.,dot(reflDir,lightDir));

  vec3 envMapColorBlur = getEnvMap(reflDir,envMapBlur).rgb;

  vec3 bb = texture2D(bbTex,vUV).xyz;
  vec3 col = bb;
  col = mix(col,envMapColorBlur*2.5,0.5);
  col += pow(b2,5.)*0.5;
  col *= 2.;



  gl_FragColor = vec4(col,1.);
}