package com.th;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TransithiveV2Application {

	public static void main(String[] args) {
		SpringApplication.run(TransithiveV2Application.class, args);
	}
	
	@Bean //equivalent to <bean id ..../> in xml file
	//use case - for configuring 3rd part java classes as spring beans !
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();	
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT) //only MATCHING prop names between src n dest will be transferred , during the mapping
		.setPropertyCondition(Conditions.isNotNull());// only non null properties will be transferred from src --> dest , during the mapping
	return modelMapper; // rets configured modelmapper instance to the call : sc

	}

}
