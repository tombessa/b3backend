
export const TypeCountEnum : {
		Development : 'Development' 
	Improvement : 'Improvement' 
	Application : 'Application' 

}= {
		Development : 'Development', 
	Improvement : 'Improvement', 
	Application : 'Application', 

}
export type TypeCountEnum = typeof TypeCountEnum[keyof typeof TypeCountEnum]; 

