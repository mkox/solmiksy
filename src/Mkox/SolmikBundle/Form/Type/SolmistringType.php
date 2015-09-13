<?php

namespace Mkox\SolmikBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Mkox\SolmikBundle\Utils;

/**
 * Defines the form used to create and manipulate solmistrings.
 */
class SolmistringType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $soundKeys =  Utils\Misc::getSoundKeys();
        $soundKeyOptions = array();
        foreach ($soundKeys as $value => $label) {
            $soundKeyOptions[$value] = $label;
        }
        
        $baseScaleOptions = array();
        for ($i = 1; $i <= 9; $i++) {
            $baseScaleOptions[$i] = $i;
        }
        
        // for the full reference of options defined by each form field type
        // see http://symfony.com/doc/current/reference/forms/types.html
        $builder
            ->add('name')
            ->add('soundKey', 'choice', array('choices' => $soundKeyOptions))
            ->add('baseScale', 'choice', array('choices' => $baseScaleOptions))
            ->add('string')
//            ->add('category', new CategoryType())
            ->add('categories', 'entity', array(
                'class' => 'MkoxSolmikBundle:Category',
                'property' => 'name',
                'multiple' => 'true'
//                'choices' => $solmistring->Categories(), 
                //$solmistring über $options übergeben?
            ))
            ->add('save', 'submit')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Mkox\SolmikBundle\Entity\Solmistring',
            'csrf_protection' => false
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'solmik_solmistring';
    }
}
